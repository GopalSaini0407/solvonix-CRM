// Breadcrumbs.jsx
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && (
              <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            )}
            {index !== items.length - 1 ? (
              <a href={item.href} className="text-blue-700 hover:underline">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
