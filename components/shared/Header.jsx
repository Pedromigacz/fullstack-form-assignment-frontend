import Link from "next/link";

const Header = ({ data }) => {
  return (
    <header className="flex items-center w-full h-16">
      <Link href="/">
        <a className="ml-8 mr-4 font-bold">Home</a>
      </Link>
      <Link href="/createForm">
        <a className="ml-4 mr-8 font-bold">Create new form</a>
      </Link>
    </header>
  );
};

export default Header;
