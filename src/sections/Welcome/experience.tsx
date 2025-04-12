import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Sparkles } from "lucide-react";

export default function Experience() {
  return (
    <div className="w-full container">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full md:w-1/3 space-y-4">
          <p className="text-primary font-medium flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            WORK HISTORY
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Experience
          </h1>
          <p className="text-muted-foreground text-lg text-justify">
            I have worked in several companies as a professional web developer.
          </p>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/3">
          {/* Job Entry 1 */}
          <div className="py-6 border-b">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-blue-100">
                  <AvatarImage src="/assets/experience/bnpt.png" alt="bnpt" />
                  <AvatarFallback>BNPT</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium text-lg">Programmer</h2>
                  <p className="text-muted-foreground">
                    Badan Nasional Penanggulangan Terorisme RI
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Jan 2024 — Mar 2025
              </p>
            </div>
          </div>

          {/* Job Entry 2 */}
          <div className="py-6 border-b">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-white">
                  <AvatarImage
                    src="/assets/experience/kemenkop.png"
                    alt="kemenkop"
                  />
                  <AvatarFallback>DC</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium text-lg">
                    Internship Web Developer
                  </h2>
                  <p className="text-muted-foreground">
                    PT Cipta Muda Solusi X Kementerian Koperasi dan UKM
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Agt 2023 — Jan 2024
              </p>
            </div>
          </div>

          {/* Job Entry 3 */}
          <div className="py-6 border-b">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-blue-500">
                  <AvatarImage src="/" alt="DS" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium text-lg">Data Science</h2>
                  <p className="text-muted-foreground">
                    3rd place in Data Science Online LKS in West Java
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">May 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
