import {Rombos} from "../assets/rombos"

const BestProduct = () => {
  return (
    <div className="flex flex-col items-center w-full text-gray-600 mx-auto">
      <div className="flex gap-x-5 underline text-lg">
        <Rombos style="w-20 text-primary dark:text-dark-tertiary" />
        <p className='text-[#9D1A1A] dark:text-dark-bg no-underline'>Talleres del mes</p>
        <Rombos style="w-20 text-primary dark:text-dark-tertiary" />
      </div>
      <p className="text-sm text-opacity-50 text-[#9D1A1A] dark:text-dark-bg">
        ¡Aprende como hacerlos en estos talleres educativos!
      </p>
      <img src="/image.svg" alt="" className="w-3/4 mt-4" />
    </div>
  );
};

export default BestProduct;