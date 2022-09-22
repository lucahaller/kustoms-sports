import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Payment from "./Payment";
import { getProductInfo } from "../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

const Carrito = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const email = user.email;

  useEffect(() => {
    dispatch(getProductInfo(email));
  }, [dispatch, isAuthenticated, user]);
  const dataBuy = useSelector((state) => state.dataBuy);
  const data = useSelector((state) => state.data);
  //const name = dataBuy.products.name
  console.log(dataBuy);
  console.log(data);
  

  return (
    <div>
      <div className="flex flex-col mt[100px]">
        <div className=" flex ml-[200px] text-[30px] font-bold mt-[100px]">TU CARRITO : {dataBuy.length} items  total:{data.totalamount}</div>
        <div className="mt-[50px] flex flex-row gap-[300px] mb-[100px]">
        
          <div>
            <div className="flex flex-col gap-[50px]">
              {dataBuy?.map((e) => {
                return (
                  <div className="flex flex- row border-[2px] ml-[200px] w-[700px] h-[220px]">
                    <div>
                      <img
                        src={e.image[0]}
                        alt="imagen del product"
                        width="200px"
                        height="200px"
                      />
                    </div>
                    <div className="flex flex-col ml-[10px] items-start ">
                      <h1 className="text-[20px] font-bold">{e.name}</h1>
                      <div>{e.collection}</div>
                      <div>{e.color}</div>
                      <div className="mt-[30px]"> Cantidad :</div>
                      <div> Precio por unidad : ${e.price}</div>

                    </div>
                    <div>
                      <div className="ml-[166px]">
                        <button className="bg-neutral px-3 py-1 border-neutral  text-neutral-600 hover:text-[white] hover:shadow-[inset_13rem_0_0_0] hover:shadow-[red] duration-[400ms,700ms] transition-[color,box-shadow]">
                          x
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Payment />
        </div>
      </div>
    </div>
  );
};

export default Carrito;
