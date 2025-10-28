import { AdminAccountCreateForm } from "@/components/accounts/admin/create-form";

const CreateAdminPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <AdminAccountCreateForm />
    </div>
  );
};

export default CreateAdminPage;
