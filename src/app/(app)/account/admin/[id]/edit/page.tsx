import { getAdmin } from "@/actions/accounts/admin/get-admin";
import { AdminAccountEditForm } from "@/components/accounts/admin/edit-form";
import { AdminAccount } from "@/types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const EditAdminPage = async ({ params: rawParams }: Props) => {
  const params = await rawParams;
  const { data: adminAccount, error } = await getAdmin({ id: params.id });
  if (error) {
    throw error;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 gap-y-4">
      <AdminAccountEditForm adminAccount={adminAccount as AdminAccount} />
    </div>
  );
};

export default EditAdminPage;
