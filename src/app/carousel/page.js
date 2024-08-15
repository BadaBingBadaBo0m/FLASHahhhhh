import Carousel from "@/components/Carousel";

const CarouselTest = () => {
  let slides = [
    {prompt: "Hi how are ya", answer: "Good how about you"},
    {prompt: "You are a weird feller", answer: "That's what she said"},
    {prompt: "What's the best gum ever?", answer: "Charleston chew"},
    {prompt: "Bruh you suck", answer: "I know"},
  ];

  return (
    <div className="w-[60%] h-full m-auto pt-11 ">
      <Carousel slides={slides} />
    </div>
  );
}

export default CarouselTest;
