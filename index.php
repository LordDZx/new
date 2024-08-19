<?php
// بدء التخزين المؤقت للمخرجات
ob_start();

// إعدادات الجلسة
ini_set('session.gc_maxlifetime', 3600); // تعيين وقت انتهاء الجلسة بالثواني (على سبيل المثال، 3600 ثانية = ساعة)

// معلومات قاعدة البيانات
$servername = 'fdb1029.awardspace.net'; // تأكد من صحة اسم المضيف
$username = '4497343_dollar'; // اسم المستخدم لقاعدة البيانات
$password = 'Ahmedreda#1'; // كلمة مرور قاعدة البيانات
$dbname = '4497343_dollar'; // اسم قاعدة البيانات

// إنشاء الاتصال بقاعدة البيانات
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من وجود خطأ في الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

// التعامل مع تسجيل الخروج
if (isset($_GET['logout']) && $_GET['logout'] == 'true') {
    setcookie('login_type', '', time() - 3600, '/'); // حذف ملفات تعريف الارتباط
    setcookie('user_id', '', time() - 3600, '/'); // حذف ملفات تعريف الارتباط
    header('Location: index.php'); // إعادة تحميل الصفحة
    exit();
}

// التحقق من وجود ملفات تعريف الارتباط
if (isset($_COOKIE['login_type']) && isset($_COOKIE['user_id'])) {
    // تحقق من صحة تسجيل الدخول
    $login_type = $_COOKIE['login_type'];
    $user_id = $_COOKIE['user_id'];
    
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ? AND is_passkey = ?");
    
    if ($login_type == 'passkey') {
        $is_passkey = true;
    } else {
        $is_passkey = false;
    }
    
    $stmt->bind_param('is', $user_id, $is_passkey);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    
    if (!$user) {
        // إذا لم يكن المستخدم موجودًا، أعد توجيه إلى تسجيل الدخول
        setcookie('login_type', '', time() - 3600, '/'); // حذف ملفات تعريف الارتباط
        setcookie('user_id', '', time() - 3600, '/'); // حذف ملفات تعريف الارتباط
        header('Location: index.php'); // إعادة تحميل الصفحة
        exit();
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // التعامل مع نموذج تسجيل الدخول
    if (isset($_POST['username']) && isset($_POST['password'])) {
        // تسجيل الدخول بالاسم وكلمة السر
        $username = $_POST['username'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND is_passkey = FALSE");
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            // تعيين ملفات تعريف الارتباط
            setcookie('login_type', 'username', time() + 3600, '/'); // ينتهي بعد ساعة
            setcookie('user_id', $user['id'], time() + 3600, '/');
            header('Location: index.php');
            exit();
        } else {
            $error = 'اسم المستخدم أو كلمة المرور غير صحيحة';
        }
    } elseif (isset($_POST['passkey'])) {
        // تسجيل الدخول بالمفتاح السري
        $passkey = $_POST['passkey'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE password = ? AND is_passkey = TRUE");
        $stmt->bind_param('s', $passkey);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            // تعيين ملفات تعريف الارتباط
            setcookie('login_type', 'passkey', time() + 3600, '/'); // ينتهي بعد ساعة
            setcookie('user_id', $user['id'], time() + 3600, '/');
            header('Location: index.php');
            exit();
        } else {
            $error = 'المفتاح السري غير صحيح';
        }
    }
} else {
    $error = '';
}

// إظهار محتوى الصفحة
?>
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>الصفحة الرئيسية</title>
    <link rel="stylesheet" href="styles-php.css">
</head>
<body>

<div class="container">
    <?php if (!isset($_COOKIE['login_type']) || !isset($_COOKIE['user_id'])): ?>
        <button id="toggle-login" onclick="toggleLoginForm()">سجل بالكود السري</button>

        <!-- نموذج تسجيل الدخول بالاسم وكلمة السر -->
        <div id="login-username" class="login-form">
            <?php if (!empty($error)): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>

            <form method="post">
                <h2>تسجيل الدخول بالاسم وكلمة السر</h2>
                <div class="form-group">
                    <label for="username">اسم المستخدم</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">كلمة المرور</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <button type="submit">تسجيل الدخول</button>
                </div>
            </form>
        </div>

        <!-- نموذج تسجيل الدخول بالمفتاح السري -->
        <div id="login-passkey" class="login-form" style="display: none;">
            <form method="post">
                <h2>تسجيل الدخول بالمفتاح السري</h2>
                <div class="form-group">
                    <label for="passkey">المفتاح السري</label>
                    <input type="text" id="passkey" name="passkey" required>
                </div>
                <div class="form-group">
                    <button type="submit">تسجيل الدخول</button>
                </div>
            </form>
        </div>
    <?php else: ?>
        <h1>مرحبا بك في الموقع</h1>
        <p>تم تسجيل الدخول بنجاح.</p>
        <a href="?logout=true" class="logout">تسجيل الخروج</a>
    <?php endif; ?>
</div>

<script>
function toggleLoginForm() {
    var loginUsername = document.getElementById('login-username');
    var loginPasskey = document.getElementById('login-passkey');
    var button = document.getElementById('toggle-login');

    if (loginUsername.style.display === 'none') {
        loginUsername.style.display = 'block';
        loginPasskey.style.display = 'none';
        button.textContent = 'سجل بالكود السري';
    } else {
        loginUsername.style.display = 'none';
        loginPasskey.style.display = 'block';
        button.textContent = 'سجل بالاسم وكلمة السر';
    }
}
</script>

</body>
</html>
