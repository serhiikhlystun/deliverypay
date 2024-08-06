import { Cashback } from "@/queries/ProductsQueries";


export const Percent = () => {
const { data: data, isSuccess } = useQuery(
    ['сashback', 1],
    async () => await fetchData(Cashback(1), {}),
  );
console.log(data,isSuccess)
  return data
}