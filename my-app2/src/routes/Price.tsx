interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  return <h1>{coinId} from Price</h1>;
}

export default Price;
