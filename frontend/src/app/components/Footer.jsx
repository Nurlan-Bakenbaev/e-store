import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-slate-800 pt-12 pb-4 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        <div>
          <h4 className="text-accent font-semibold text-lg mb-6">
            Quick Links
          </h4>
          <ul className="space-y-5">
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Our Story
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Newsroom
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-semibold text-lg mb-6">Services</h4>
          <ul className="space-y-5">
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Web Development
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Testing Automation
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                AWS Development Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Mobile App Development
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-semibold text-lg mb-6">Platforms</h4>
          <ul className="space-y-5">
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Hubspot
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Marketo Integration Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Marketing Glossary
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                UIPath
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-semibold text-lg mb-6">Company</h4>
          <ul className="space-y-5">
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Accessibility
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent text-[15px] transition-all">
                Learn more
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center pt-4 mt-8">
        <p className="text-[15px]">
          All rights belong to their respective owners. This website was created
          for educational purposes, using free resources. Images are taken from{" "}
          <a
            href="https://www.freepik.com"
            target="_blank"
            className="underline text-blue-500 text-xl uppercase">
            Freepik
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
