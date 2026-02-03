import { useState, useEffect } from "react";
import { MapPin, QrCode, Calendar, Bot, Users, Navigation, Search, Star, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useSearchParams } from "react-router";
import Papa from "papaparse";

export default function VisitorDashboard() {
  const [searchParams] = useSearchParams();
  const [selectedStand, setSelectedStand] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("map");
  const [searchQuery, setSearchQuery] = useState("");

  // Check URL params for tab
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "ai") {
      setActiveTab("ai");
    }
  }, [searchParams]);

  interface Exhibitor {
    id: string;
    name: string;
    hall: string;
    stand: string;
    category: string;
    distance: string;
  }

  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);

  interface Event {
    id: string;
    title: string;
    time: string;
    hall: string;
    seats: number;
    booked: number;
  }

  const [realEvents, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsRes, exhibitorsRes] = await Promise.all([
          fetch("/data/eventi.csv"),
          fetch("/data/espositori.csv")
        ]);

        const [eventsText, exhibitorsText] = await Promise.all([
          eventsRes.text(),
          exhibitorsRes.text()
        ]);

        Papa.parse<any>(eventsText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const loadedEvents = results.data.slice(0, 10).map((row: any, index: number) => ({
              id: index.toString(),
              title: row["card-event-title"] || "Evento Senza Titolo",
              time: row["times"] || "Orario da definire",
              hall: row["label"] || "Luogo da definire",
              seats: 100,
              booked: Math.floor(Math.random() * 80),
            }));
            setEvents(loadedEvents);
          },
        });

        Papa.parse<any>(exhibitorsText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const loadedExhibitors = results.data.slice(0, 100).map((row: any, index: number) => ({
              id: index.toString(),
              name: row["card-digitalprofile-name"] || "Nome non disponibile",
              hall: row["line-clamp-2"] || "N/A",
              stand: row["card-digitalprofile-position"] || "Posizione",
              category: "Espositore",
              distance: `${Math.floor(Math.random() * 300) + 50}m`
            }));
            setExhibitors(loadedExhibitors);
          },
        });
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };
    loadData();
  }, []);

  const filteredExhibitors = exhibitors.filter(ex =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.hall.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const savedContacts = [
    { id: "1", name: "Marco Rossi", company: "Dolce Italia", role: "Sales Manager", date: "Oggi, 09:30" },
    { id: "2", name: "Laura Bianchi", company: "Pasticceria Moderna", role: "CEO", date: "Oggi, 11:15" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard Visitatore</h1>
          <p className="text-muted-foreground">Naviga, scopri e connettiti con gli espositori</p>
        </div>

        <Tabs defaultValue={activeTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="map" className="gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Espositori</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Eventi</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">Contatti</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
          </TabsList>

          {/* Espositori Grid */}
          <TabsContent value="map" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca espositore o padiglione..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredExhibitors.map((exhibitor) => (
                <Card key={exhibitor.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold uppercase leading-tight h-12 line-clamp-2">
                      {exhibitor.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">POSIZIONE</span>
                        <span className="text-sm font-semibold">{exhibitor.hall}</span>
                      </div>
                    </div>
                    <div className="bg-secondary/30 px-6 py-3 flex items-center justify-between">
                      <Button variant="link" className="p-0 text-primary font-bold flex items-center gap-2 no-underline hover:no-underline">
                        SCOPRI <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Badge variant="outline" className="text-[10px] bg-white/50 border-none shadow-sm">
                        {exhibitor.distance}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Eventi */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Eventi e Workshop
                </CardTitle>
                <CardDescription>Prenota il tuo posto per le sessioni in programma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realEvents.map((event) => (
                    <div key={event.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge variant={event.booked >= event.seats ? "destructive" : "secondary"}>
                          {event.seats - event.booked} posti
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.hall}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {event.booked}/{event.seats} prenotati
                          </span>
                        </div>
                        <Button size="sm" disabled={event.booked >= event.seats}>
                          {event.booked >= event.seats ? "Sold Out" : "Prenota"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contatti QR */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    Scansiona QR Code
                  </CardTitle>
                  <CardDescription>Salva i contatti degli espositori</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center p-6">
                      <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Inquadra il QR Code dello stand per salvare il contatto
                      </p>
                      <Button>Attiva Scanner</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contatti Salvati</CardTitle>
                  <CardDescription>{savedContacts.length} contatti nel tuo network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {savedContacts.map((contact) => (
                      <div key={contact.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{contact.name}</h4>
                            <p className="text-sm text-muted-foreground">{contact.role}</p>
                          </div>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{contact.company}</span>
                          <span className="text-muted-foreground">{contact.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Assistant */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Assistente AI SIGEP
                </CardTitle>
                <CardDescription>Chiedi informazioni su espositori, eventi e servizi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-96 bg-secondary/30 rounded-lg p-4 flex items-center justify-center italic text-muted-foreground text-sm border-2 border-dashed">
                    Usa il chatbot in basso a destra per interagire con l'AI
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}