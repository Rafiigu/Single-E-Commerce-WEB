import { Table } from "@/components/shared/table";
import { Account } from "@/types";

const accounts: Account[] = [
  {
    id: "ACC001",
    name: "Andhika Putra",
    email: "andhika.putra@example.com",
    role: "superadmin",
    status: "active",
    isPasswordChanged: true,
    createdAt: new Date("2024-05-15T09:24:00Z"),
    updatedAt: new Date("2025-01-10T13:42:00Z"),
  },
  {
    id: "ACC002",
    name: "Rizky Santoso",
    email: "rizky.santoso@example.com",
    role: "admin",
    status: "inactive",
    isPasswordChanged: false,
    createdAt: new Date("2024-07-02T11:15:00Z"),
    updatedAt: new Date("2024-09-18T10:05:00Z"),
  },
  {
    id: "ACC003",
    name: "Dewi Kartika",
    email: "dewi.kartika@example.com",
    role: "staff",
    status: "active",
    isPasswordChanged: true,
    createdAt: new Date("2024-09-10T07:50:00Z"),
    updatedAt: new Date("2025-03-21T08:20:00Z"),
  },
  {
    id: "ACC004",
    name: "Bima Nugraha",
    email: "bima.nugraha@example.com",
    role: "admin",
    status: "suspended",
    isPasswordChanged: false,
    createdAt: new Date("2024-03-25T15:30:00Z"),
    updatedAt: new Date("2024-12-02T12:44:00Z"),
  },
  {
    id: "ACC005",
    name: "Sinta Wijaya",
    email: "sinta.wijaya@example.com",
    role: "staff",
    status: "active",
    isPasswordChanged: true,
    createdAt: new Date("2024-10-01T08:00:00Z"),
    updatedAt: new Date("2025-04-17T09:10:00Z"),
  },
  {
    id: "ACC006",
    name: "Fajar Ramadhan",
    email: "fajar.ramadhan@example.com",
    role: "admin",
    status: "pending",
    isPasswordChanged: false,
    createdAt: new Date("2025-01-10T11:22:00Z"),
    updatedAt: new Date("2025-02-12T10:01:00Z"),
  },
  {
    id: "ACC007",
    name: "Lestari Anggraini",
    email: "lestari.anggraini@example.com",
    role: "staff",
    status: "active",
    isPasswordChanged: true,
    createdAt: new Date("2024-11-20T13:35:00Z"),
    updatedAt: new Date("2025-05-04T14:12:00Z"),
  },
  {
    id: "ACC008",
    name: "Arif Gunawan",
    email: "arif.gunawan@example.com",
    role: "superadmin",
    status: "active",
    isPasswordChanged: true,
    createdAt: new Date("2023-12-10T09:10:00Z"),
    updatedAt: new Date("2025-01-15T17:50:00Z"),
  },
  {
    id: "ACC009",
    name: "Nadia Rahma",
    email: "nadia.rahma@example.com",
    role: "staff",
    status: "inactive",
    isPasswordChanged: false,
    createdAt: new Date("2024-02-18T10:05:00Z"),
    updatedAt: new Date("2024-10-30T16:20:00Z"),
  },
  {
    id: "ACC010",
    name: "Reza Pratama",
    email: "reza.pratama@example.com",
    role: "admin",
    status: "active",
    isPasswordChanged: true,
    createdAt: new Date("2024-04-12T06:45:00Z"),
    updatedAt: new Date("2025-03-28T11:55:00Z"),
  },
];

const DummyTablePage = () => {
  return (
    <div>
      <Table
        data={accounts}
        headers={{
          name: "Nama Lengkap",
          email: "Email",
          role: "Role",
        }}
        render={{
          role(val) {
            const map = {
              superadmin: "Super Admin",
              admin: "Admin",
              staff: "Staff",
            };

            return <span>{map[val]}</span>;
          },
        }}
        minWidths={{
          name: "",
          email: "",
          role: "",
        }}
      />
    </div>
  );
};

export default DummyTablePage;
