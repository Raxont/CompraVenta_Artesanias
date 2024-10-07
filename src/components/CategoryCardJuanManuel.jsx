import { Link, useLocation } from 'react-router-dom';

const CustomComponent = ({ title, icon }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const newPath = currentPath.split('/').slice(0, -1).join('/') + "/" + title;
  console.log(newPath)

  return (
    <Link to={newPath} className="h-[100%] rounded-md flex flex-col items-center p-1 mx-[50px]">
      <div className='bg-dark-tertiary rounded-full flex items-center justify-center h-[58px] w-[58px]'>
        <img src={icon} className="h-[60%]"></img>
      </div>
      <div>
        <h2 className="text-lg font-light overflow-hidden overflow-ellipsis whitespace-nowrap">{title}</h2>
      </div>
    </Link>
  );
};

export default CustomComponent;
