import { UserAccountCreateForm } from "@/components/accounts/user/create-form";

const CreateUserPage = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-y-4 p-4">
      <UserAccountCreateForm />
    </div>
  );
};

export default CreateUserPage;
