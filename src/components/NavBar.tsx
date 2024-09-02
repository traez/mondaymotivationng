import ThemeSwitch from "@/components/ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="flex flex-col justify-center items-center sm:flex-row sm:justify-between p-1 border-b bg-[#14141444]">
       <ThemeSwitch />
    </nav>
  );
}
