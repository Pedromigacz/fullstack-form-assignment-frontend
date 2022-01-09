import Link from "next/link";

const Header = ({ data, darkTheme }) => {
  return (
    <header className="flex items-center w-full h-16">
      <Link href="/">
        <a
          className={`ml-8 mr-4 text-lg font-bold ${
            darkTheme && "text-gray-50"
          }`}
        >
          Home
        </a>
      </Link>
      <Link href="/createForm">
        <a
          className={`ml-4 mr-8 text-lg font-bold ${
            darkTheme && "text-gray-50"
          }`}
        >
          Create new form
        </a>
      </Link>
    </header>
  );
};

export default Header;
