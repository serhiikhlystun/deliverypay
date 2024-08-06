import { Cashback } from "@/queries/ProductsQueries";


const Percent = () => {
const { data: data, isSuccess } = useQuery(
    ['сashback', 1],
    async () => await fetchData(Cashback, {}),
  );

}