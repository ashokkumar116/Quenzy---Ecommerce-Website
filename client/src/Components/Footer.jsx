import { href ,Link } from 'react-router-dom';
import logo from '../assets/navlogo.png'


const Footer = () => {
    const linkSections = [
        {
          title: "Quick Links",
          links: [
            { name: "Home", href: "/" },
            { name: "Best Sellers", href: "/comingsoon" },
            { name: "Offers & Deals", href: "/comingsoon" },
            { name: "Contact Us", href: "/contact" },
            { name: "FAQs", href: "/faq" }
          ]
        },
        {
          title: "Need Help?",
          links: [
            { name: "Delivery Information", href: "/delivery" },
            { name: "Return & Refund Policy", href: "/comingsoon" },
            { name: "Payment Methods", href: "/comingsoon" },
            { name: "Track your Order", href: "/comingsoon" },
            { name: "Contact Us", href: "/contact" }
          ]
        },
        {
          title: "Follow Us",
          links: [
            { name: "Instagram", href: "https://www.instagram.com" },
            { name: "Twitter", href: "https://www.twitter.com" },
            { name: "Facebook", href: "https://www.facebook.com" },
            { name: "YouTube", href: "https://www.youtube.com" }
          ]
        }
      ];
      

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-primary/50 text-base-content/50">
                <div className='flex flex-col justify-center items-center'>
                    <img className="w-44 md:w-70" src={logo} />
                    <p className="max-w-[410px] mt-6">Discover quality products at unbeatable prices. We’re on a mission to make online shopping easy, reliable, and joyful for everyone across India.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-primary md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link to={link.href} className="hover:underline transition">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-base-content/60">
                Copyright 2025 © <a href="#">Quenzy</a> All Right Reserved.
            </p>
        </div>
    );
};

export default Footer;