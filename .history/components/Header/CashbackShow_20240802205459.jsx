import { Cashback } from "@/queries/ProductsQueries";


const TextSlider = () => {
const { data: data, isSuccess } = useQuery(
    ['cashback'],
    async () => await fetchData(Cashback, {}),
  );

}