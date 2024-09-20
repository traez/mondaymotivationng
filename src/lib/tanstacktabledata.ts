export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  mongoId: string; // Changed explore to mongoId
}

const mockData: Array<UserData> = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    mongoId: "66e0390ffaae0dee7f9a80c5", // Sample MongoDB ObjectID
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "987-654-3210",
    mongoId: "64e9b872f2c76f00129d74a2",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michaeljohnson@example.com",
    phone: "555-123-4567",
    mongoId: "64e9b872f2c76f00129d74a3",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emilywilson@example.com",
    phone: "999-888-7777",
    mongoId: "64e9b872f2c76f00129d74a4",
  },
  {
    id: 5,
    name: "Daniel Lee",
    email: "daniellee@example.com",
    phone: "444-555-6666",
    mongoId: "64e9b872f2c76f00129d74a5",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    email: "oliviamartinez@example.com",
    phone: "777-999-1111",
    mongoId: "64e9b872f2c76f00129d74a6",
  },
  {
    id: 7,
    name: "William Thompson",
    email: "williamthompson@example.com",
    phone: "222-333-4444",
    mongoId: "64e9b872f2c76f00129d74a7",
  },
  {
    id: 8,
    name: "Sophia Garcia",
    email: "sophiagarcia@example.com",
    phone: "333-444-5555",
    mongoId: "64e9b872f2c76f00129d74a8",
  },
  {
    id: 9,
    name: "Benjamin Adams",
    email: "benjaminadams@example.com",
    phone: "444-555-6667",
    mongoId: "64e9b872f2c76f00129d74a9",
  },
  {
    id: 10,
    name: "Charlotte White",
    email: "charlottewhite@example.com",
    phone: "555-666-7778",
    mongoId: "64e9b872f2c76f00129d74aa",
  },
  {
    id: 11,
    name: "James Brown",
    email: "jamesbrown@example.com",
    phone: "666-777-8889",
    mongoId: "64e9b872f2c76f00129d74ab",
  },
  {
    id: 12,
    name: "Isabella Clark",
    email: "isabellaclark@example.com",
    phone: "777-888-9990",
    mongoId: "64e9b872f2c76f00129d74ac",
  },
  {
    id: 13,
    name: "Henry Walker",
    email: "henrywalker@example.com",
    phone: "888-999-0001",
    mongoId: "64e9b872f2c76f00129d74ad",
  },
  {
    id: 14,
    name: "Mia Rodriguez",
    email: "miarodriguez@example.com",
    phone: "999-000-1112",
    mongoId: "64e9b872f2c76f00129d74ae",
  },
  {
    id: 15,
    name: "Alexander Lewis",
    email: "alexanderlewis@example.com",
    phone: "000-111-2223",
    mongoId: "64e9b872f2c76f00129d74af",
  },
  {
    id: 16,
    name: "Amelia Hall",
    email: "ameliahall@example.com",
    phone: "111-222-3334",
    mongoId: "64e9b872f2c76f00129d74b0",
  },
  {
    id: 17,
    name: "Elijah Allen",
    email: "elijahallen@example.com",
    phone: "222-333-4445",
    mongoId: "64e9b872f2c76f00129d74b1",
  },
  {
    id: 18,
    name: "Ava Young",
    email: "avayoung@example.com",
    phone: "333-444-5556",
    mongoId: "64e9b872f2c76f00129d74b2",
  },
  {
    id: 19,
    name: "Noah King",
    email: "noahking@example.com",
    phone: "444-555-6667",
    mongoId: "64e9b872f2c76f00129d74b3",
  },
  {
    id: 20,
    name: "Grace Scott",
    email: "gracescott@example.com",
    phone: "555-666-7778",
    mongoId: "64e9b872f2c76f00129d74b4",
  },
];

export default mockData;
