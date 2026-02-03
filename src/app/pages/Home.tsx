import { Link } from "react-router";
import { Users, Building2, BarChart3, MapPin, QrCode, Bot, Camera, Mic, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import logo from "figma:asset/040f1bf4edf272b5239c3ddd65f70999fb9e5347.png";

export default function Home() {
  const features = [
    {
      title: "Visitatori",
      description: "Navigazione indoor con AR, eventi e networking",
      icon: Users,
      href: "/visitor",
      color: "bg-primary",
      features: ["Mappa Interattiva + AR", "Gestione Eventi", "QR Code Networking", "Assistente AI"],
      icons: [MapPin, QrCode, Bot],
    },
    {
      title: "Espositori",
      description: "CRM mobile per lead generation avanzata",
      icon: Building2,
      href: "/exhibitor",
      color: "bg-accent",
      features: ["Acquisizione Lead", "Input Foto/Voce", "CRM Integrato", "Analytics in tempo reale"],
      icons: [Camera, Mic, QrCode],
    },
    {
      title: "Organizzatore IEG",
      description: "Dashboard di monitoraggio flussi visitatori",
      icon: BarChart3,
      href: "/ieg",
      color: "bg-chart-3",
      features: ["Heatmap Real-time", "Analytics Avanzate", "Gestione Stand", "Report Esportabili"],
      icons: [Activity, BarChart3, MapPin],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SIGEP WORLD
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              La fiera leader mondiale nel settore del Dolce
            </p>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Piattaforma digitale completa per visitatori, espositori e organizzatori.
              Esplora l'evento con tecnologie AR, gestisci i contatti e monitora i flussi in tempo reale.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.href} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.features.map((item, idx) => {
                        const FeatureIcon = feature.icons[idx % feature.icons.length];
                        return (
                          <li key={item} className="flex items-start gap-3">
                            <div className="mt-1">
                              <FeatureIcon className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-6 text-primary font-medium group-hover:underline">
                      Accedi alla dashboard →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "1200+", label: "Espositori" },
              { number: "30k+", label: "Visitatori" },
              { number: "50+", label: "Paesi" },
              { number: "5", label: "Giorni di evento" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto per l'esperienza digitale?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Scegli il tuo profilo e inizia a esplorare tutte le funzionalità della piattaforma SIGEP World
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/visitor"
              className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Sono un Visitatore
            </Link>
            <Link
              to="/exhibitor"
              className="bg-white/20 text-white border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              Sono un Espositore
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}