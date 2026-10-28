export const SITE = {
  name: "Mr Luxury Chauffeur",
  domain: "https://www.mrluxurychauffeur.com",
  phone: "+353 89 613 8243",
  phoneHref: "tel:+353896138243",
  whatsapp: "353896138243",
  email: "info@mrluxurychauffeur.com",
  city: "Dublin, Ireland",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* Client photography, hosted locally in /public/images */
export const IMAGES = {
  heroEqs: "/images/hero.jpeg",
  cityDrive: "/images/band.jpeg",
  interior: "/images/interior.jpeg",
  detail: "/images/interior-2.jpeg",
  fleetFront: "/images/studio-rear.jpeg",
  rear: "/images/studio-rear.jpeg",
};
