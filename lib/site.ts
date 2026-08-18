export const SITE = {
  name: "MR Luxury Chauffeur",
  domain: "https://www.mrluxurychauffeur.com",
  phone: "+353 89 613 8243",
  phoneHref: "tel:+353896138243",
  whatsapp: "353896138243",
  email: "m.rahmann198929@gmail.com",
  city: "Dublin, Ireland",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* Existing brand photography served from the live site's CDN.
   Swap for locally hosted originals in /public/images when the client
   sends the full-resolution files. */
const wix = (id: string, w: number, h: number) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_85,enc_avif,quality_auto/${id}`;

export const IMAGES = {
  heroEqs: wix("a1b6c1_465d26f31ff44a4e801ddce3e8906abf~mv2.avif", 1600, 1000),
  fleetFront: wix("a1b6c1_642df65c04924b66b6e6e02cc1f1bee4~mv2.jpeg", 1200, 900),
  interior: wix("a1b6c1_ebc59baf2a294042b629b2992b3af2a1~mv2.jpeg", 1200, 900),
  detail: wix("a1b6c1_f6fba667150a43ef9b8a97a78f61e682~mv2.jpeg", 1200, 900),
  rear: wix("a1b6c1_6000e4792ace4b398945da75b98c7b10~mv2.jpeg", 1200, 900),
  cityDrive: wix("a1b6c1_1cb91d9a85e9460c8eea51a1b3648987~mv2.jpeg", 1400, 900),
};
