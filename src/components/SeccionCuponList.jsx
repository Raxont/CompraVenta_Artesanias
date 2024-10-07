import CouponCard from './CuponCard'; // Asegúrate de que CouponCard esté en el mismo directorio o importa correctamente

const CouponList = ({ arrive }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {arrive.map((item, index) => (
        <CouponCard key={index} arrive={item} />
      ))}
    </div>
  );
};

export default CouponList;
