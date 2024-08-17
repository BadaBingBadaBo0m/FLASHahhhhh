import Carousel from "@/components/Carousel";

const CarouselTest = () => {
  let slides = [
    { question: "Hi how are ya", answer: "Good how about you" },
    { question: "You are a weird feller", answer: "That's what she said" },
    { question: "What's the best gum ever?", answer: "Charleston chew" },
    { question: "Bruh you suck", answer: "I know" },
  ];

  return (
    <div className="w-[60%] h-screen m-auto pt-11 ">
      <Carousel slides={slides} />
    </div>
  );
}

export default CarouselTest;
