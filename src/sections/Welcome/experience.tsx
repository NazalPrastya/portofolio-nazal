import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Experience() {
  const { t } = useTranslation();
  return (
    <div className="container w-full">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left Column */}
        <div className="w-full space-y-4 md:w-1/3">
          <p className="text-primary flex items-center gap-2 font-medium">
            <Sparkles className="h-5 w-5" />
            {t("experience.history")}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("experience.title")}
          </h1>
          <p className="text-muted-foreground text-justify text-lg">
            {t("experience.subtitle")}
          </p>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-2/3">
          {/* Job Entry 1 */}
          <div className="border-b py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-blue-100">
                <AvatarImage src="/assets/experience/bnpt.png" alt="bnpt" />
                <AvatarFallback>BNPT</AvatarFallback>
              </Avatar>
              <div className="flex w-full flex-col justify-between md:flex-row">
                <div>
                  <h2 className="text-lg font-medium">Programmer</h2>
                  <p className="text-muted-foreground">
                    Badan Nasional Penanggulangan Terorisme RI
                  </p>
                </div>
                <p className="text-muted-foreground w-fit text-right">
                  Jan 2024 — Mar 2025
                </p>
              </div>
            </div>
          </div>

          {/* Job Entry 2 */}
          <div className="border-b py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-white">
                <AvatarImage
                  src="/assets/experience/kemenkop.png"
                  alt="kemenkop"
                />
                <AvatarFallback>DC</AvatarFallback>
              </Avatar>
              <div className="flex w-full flex-col justify-between md:flex-row">
                <div>
                  <h2 className="text-lg font-medium">
                    Internship Web Developer
                  </h2>
                  <p className="text-muted-foreground">
                    PT Cipta Muda Solusi X Kementerian Koperasi dan UKM
                  </p>
                </div>
                <p className="text-muted-foreground w-fit text-right">
                  Agt 2023 — Jan 2024
                </p>
              </div>
            </div>
          </div>

          {/* Job Entry 3 */}

          <div className="border-b py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-blue-500">
                <AvatarImage src="/" alt="DS" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <div className="flex w-full flex-col justify-between md:flex-row">
                <div>
                  <h2 className="text-lg font-medium">Data Science</h2>
                  <p className="text-muted-foreground">
                    3rd place in Data Science Online LKS in West Java
                  </p>
                </div>
                <p className="text-muted-foreground">May 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
