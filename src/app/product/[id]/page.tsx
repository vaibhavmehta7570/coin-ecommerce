"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";

export default function Page() {
    

    const params = useParams<{ id: string }>();
    console.log(params.id)

    const fetchProduct = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${params.id}`);
      console.log(response.data);
      return response.data;
    };

    const {
      data: product,
      error,
      isLoading,
    } = useQuery({
      queryKey: ["search"],
      queryFn: fetchProduct,
    });

    if (error) return console.log(error.message);

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <img
          alt="Product Image"
          className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
          height={900}
          src="/placeholder.svg"
          width={600}
        />
        <div className="hidden md:grid grid-cols-5 gap-3">
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height={120}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 1</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height={120}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 2</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height={120}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 3</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height={120}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 4</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-[5/6] object-cover"
              height={120}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 5</span>
          </button>
        </div>
      </div>
      <div className="grid gap-4 md:gap-10">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl lg:text-4xl">{product?.title}</h1>
          <div>
            <p>{product?.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              {/* <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              (12 reviews)
            </span>
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="font-bold text-2xl">${product?.price}</h2>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg">Add to Cart</Button>
            <Button size="lg" variant="primary">
              Buy Now
            </Button>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 text-sm leading-loose">
          <p>
            Introducing the Acme Prism T-Shirt, a perfect blend of style and
            comfort for the modern individual. This tee is crafted with a
            meticulous composition of 60% combed ringspun cotton and 40%
            polyester jersey, ensuring a soft and breathable fabric that feels
            gentle against the skin.
          </p>
          <p>
            The design of the Acme Prism T-Shirt is as striking as it is
            comfortable. The shirt features a unique prism-inspired pattern that
            adds a modern and eye-catching touch to your ensemble.
          </p>
        </div>
        <Separator />
        <div className="grid gap-6">
          <h2 className="font-bold text-2xl">Reviews</h2>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-4">
                <div className="flex gap-4 items-start">
                  <div className="grid gap-0.5 text-sm">
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      2 days ago
                    </time>
                  </div>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {/* <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                  </div>
                </div>
                <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  <p>
                    I've been wearing the Acme Prism T-Shirt for a few weeks
                    now, and it's quickly become one of my favorite tees. The
                    fabric is incredibly soft and comfortable, and the unique
                    prism design adds a stylish touch to my casual outfits.
                    Highly recommended!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-4">
                <div className="flex gap-4 items-start">
                  <div className="grid gap-0.5 text-sm">
                    <h3 className="font-semibold">Alex Smith</h3>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      3 weeks ago
                    </time>
                  </div>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {/* <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                  </div>
                </div>
                <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  <p>
                    I recently purchased the Acme Prism T-Shirt and I'm
                    absolutely in love with it. The quality is top-notch, and
                    the fit is perfect. The prism design is a unique and
                    eye-catching touch that sets this tee apart from the rest.
                    Highly recommended for anyone looking for a stylish and
                    comfortable shirt.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid gap-4">
                <div className="flex gap-4 items-start">
                  <div className="grid gap-0.5 text-sm">
                    <h3 className="font-semibold">Emily Parker</h3>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      2 days ago
                    </time>
                  </div>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {/* <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                  </div>
                </div>
                <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                  <p>
                    I was a bit hesitant about the prism design at first, but
                    after trying on the Acme Prism T-Shirt, I'm completely sold.
                    The fabric is incredibly soft and comfortable, and the
                    unique pattern adds a touch of style to my casual outfits.
                    The only downside is that the sizing runs a bit small, but
                    overall, I'm very satisfied with my purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


