import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-8">
      <div className="container mx-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
