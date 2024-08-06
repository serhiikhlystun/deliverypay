import { Cashback } from "@/queries/ProductsQueries";


const Percent = () => {
const { data: data, isSuccess } = useQuery(
    ['Cashback'],
    async () => await fetchData(Cashback, {}),
  );

}