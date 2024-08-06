import { Cashback } from "@/queries/ProductsQueries";
import { useQuery } from 'react-query';
import fetchData from "@/helpers/fetchData";


const Percent = () => {
const { data: data, isSuccess } = useQuery(
    ['сashback', 1],
    async () => await fetchData(Cashback(1), {}),
  );
console.log(data,isSuccess, 'DATA')
  return data
}

export default Percent