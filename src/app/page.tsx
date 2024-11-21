import Jollycount from "./jollycount";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Jollycount - Nedtelling til jul 2024",
            url: "https://jollycount.no",
            inLanguage: "no",
            description: "Norsk nedtelling til julaften 2024",
            event: {
              "@type": "Event",
              name: "Christmas 2024",
              startDate: "2024-12-24T17:00",
              location: {
                "@type": "Country",
                name: "Norway",
              },
            },
          }),
        }}
      />
      <Jollycount />;
    </>
  );
}
