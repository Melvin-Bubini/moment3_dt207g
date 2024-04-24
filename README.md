REST-webbtjänst för CV-hantering
Denna REST-webbtjänst är utformad för att hantera CV-information. Genom att använda denna tjänst kan andra applikationer integrera och utföra olika åtgärder relaterade till CV-data såsom att hämta befintliga CV-poster, lägga till nya poster och ta bort dem.

Installation, databas
APIet använder en MongoDB-databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör server.js skriptet. Det skapar en databastabell enligt nedanstående:


_id: ObjectId ('662783609a0541b9c410172b')
companyname: "Apple"
jobtitle: "CEO"
location: "LA"
__v: 0

Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

Metod	Ändpunkt	Beskrivning
GET	/courses	Hämtar alla tillgängliga kurser.
GET	/courses/:ID	Hämtar en specifik kurs med angivet ID.
POST	/courses	Lagrar en ny kurs. Kräver att ett kurs-objekt skickas med.
DELETE	/courses/:ID	Raderar en kurs med angivet ID.
Ett job-objekt returneras/skickas som JSON med följande struktur:

{
   _id: ObjectId ('662783609a0541b9c410172b')
companyname: "Apple"
jobtitle: "CEO"
location: "LA"
__v: 0
}
