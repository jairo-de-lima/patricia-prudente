"use client";
import RegistrationForm from "./_components/form";

const Form = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">

      <RegistrationForm onSubmit={(data) => console.log(data)} />
    </div>
  );
};

export default Form;
