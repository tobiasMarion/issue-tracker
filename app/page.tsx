import { Text } from "@radix-ui/themes";

interface Props {
  searchParams: {
    page: string
  }
}

export default function Home({ searchParams }: Props) {
  return (
    <Text>Hello, World!</Text>
  )
}
