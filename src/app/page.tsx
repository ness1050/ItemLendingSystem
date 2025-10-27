import Image from "next/image";
import CategoriesSection from "./components/CatogarySection";
import { FirstSection } from "./components/components";

export default function Home() {
  return (
    <>
    <main className="min-h-screen bg-grey-150">
      <FirstSection />
      <CategoriesSection />
    </main>
    </>
  );
}
