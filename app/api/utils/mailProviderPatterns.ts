export const providerPatterns = {
  google: {
    mx: ['aspmx.l.google.com', 'alt1.aspmx.l.google.com', 'alt2.aspmx.l.google.com'],
    spf: ['_spf.google.com', 'include:_spf.google.com'],
  },
  microsoft: {
    mx: ['protection.outlook.com', 'mail.protection.outlook.com'],
    spf: ['spf.protection.outlook.com', 'include:spf.protection.outlook.com'],
  },
  yandex: {
    mx: ['mx.yandex.net','mail.yandex.net', 'mx2.yandex.net'],
    spf: ['include:_spf.yandex.net'],
  },
  zoho: {
    mx: ['mx.zoho.com', 'mx2.zoho.com', 'mx3.zoho.com','mail.zoho.com'],
    spf: ['include:zoho.com', 'include:_spf.zoho.com'],
  },
  protonmail: {
    mx: ['mail.protonmail.ch','mx1.protonmail.ch', 'mx2.protonmail.ch'],
    spf: ['include:_spf.protonmail.ch'],
  },
  amazon: {
    mx: ['inbound-smtp.us-east-1.amazonaws.com'],
    spf: ['include:amazonses.com'],
  },
  mailgun: {
    mx: ['mxa.mailgun.org', 'mxb.mailgun.org','mx1.mailgun.org', 'mx2.mailgun.org'],
    spf: ['include:mailgun.org'],
  },
  sendgrid: {
    mx: ['mx.sendgrid.net','mx1.sendgrid.net', 'mx2.sendgrid.net'],
    spf: ['include:sendgrid.net'],
  },
  godaddy: {
    mx: ['smtp.secureserver.net','mx1.secureserver.net', 'mx2.secureserver.net'],
    spf: ['include:secureserver.net'],
  },
  yahoo: {
    mx: ['mta5.am0.yahoodns.net', 'mta6.am0.yahoodns.net','mail.yahoo.com'],
    spf: ['include:_spf.yahoo.com'],
  },
  promail: {
    mx: ['mx.promail.com.tr','mx1.promail.com.tr', 'mx2.promail.com.tr'],
    spf: ['include:promail.com.tr'],
  },
  mailbox: {
    mx: ['mx.mailbox.com.tr','mx1.mailbox.com.tr', 'mx2.mailbox.com.tr'],
    spf: ['include:mailbox.com.tr'],
  },
  uzmanposta: {
    mx: ['mx.uzmanposta.com','mx1.uzmanposta.com', 'mx2.uzmanposta.com'],
    spf: ['include:uzmanposta.com'],
  },
  fastmail: {
    mx: ['in1-smtp.messagingengine.com', 'in2-smtp.messagingengine.com'],
    spf: ['include:spf.messagingengine.com'],
  },
  icloud: {
    mx: ['mx1.mail.icloud.com', 'mx2.mail.icloud.com','mail.mail.icloud.com'],
    spf: ['include:icloud.com'],
  },
  rackspace: {
    mx: ['mx1.emailsrvr.com', 'mx2.emailsrvr.com','mail.emailsrvr.com'],
    spf: ['include:emailsrvr.com'],
  },
  ovh: {
    mx: ['mx0.ovh.net', 'mx1.ovh.net','mail.ovh.net'],
    spf: ['include:mx.ovh.com'],
  },
  hetzner: {
    mx: ['mail.your-server.de','mx1.your-server.de', 'mx2.your-server.de'],
    spf: ['include:spf.your-server.de'],
  },
  hostinger: {
    mx: ['mx1.hostinger.com', 'mx2.hostinger.com','mail.hostinger.com'],
    spf: ['include:spf.hostinger.com'],
  },
  hostgator: {
    mx: ['mx1.hostgator.com', 'mx2.hostgator.com','mail.hostgator.com'],
    spf: ['include:hostgator.com'],
  },
  netinternet: {
    mx: ['mail.netinternet.com.tr','mx1.netinternet.com.tr', 'mx2.netinternet.com.tr'],
    spf: ['include:netinternet.com.tr'],
  },
  veridyen: {
    mx: ['mail.veridyen.com','mx1.veridyen.com', 'mx2.veridyen.com'],
    spf: ['include:veridyen.com'],
  },
  isimtescil: {
    mx: ['mail.isimtescil.net','mx1.isimtescil.net', 'mx2.isimtescil.net'],
    spf: ['include:isimtescil.net'],
  },
  superonline: {
    mx: ['mail.superonline.com','mx1.superonline.com', 'mx2.superonline.com'],
    spf: ['include:superonline.com'],
  },
  vodafone: {
    mx: ['mail.vodafone.com.tr','mx1.vodafone.com.tr', 'mx2.vodafone.com.tr'],
    spf: ['include:vodafone.com.tr'],
  },
  turkcell: {
    mx: ['mail.turkcell.com.tr' ,'mx1.turkcell.com.tr', 'mx2.turkcell.com.tr'],
    spf: ['include:turkcell.com.tr'],
  },
  ttnet: {
    mx: ['mail.ttnet.com.tr','mx1.ttnet.com.tr', 'mx2.ttnet.com.tr'],
    spf: ['include:ttnet.com.tr'],
  },
  aruba: {
    mx: ['mx1.aruba.it', 'mx2.aruba.it','mail.aruba.it'],
    spf: ['include:aruba.it'],
  },
  turkticaret: {
    mx: ['mail.turkticaret.net','mx1.turkticaret.net', 'mx2.turkticaret.net'],
    spf: ['include:turkticaret.net'],
  },
  turhost: {
    mx: ['mail.turhost.com', 'mx1.turhost.com', 'mx2.turhost.com'],
    spf: ['include:turhost.com'],
  },
  nic: {
    mx: ['mail.nic.tr','mx1.nic.tr', 'mx2.nic.tr'],
    spf: ['include:nic.tr'],
  },
  hotmail: {
    mx: ['mx1.hotmail.com', 'mx2.hotmail.com','mail.hotmail.com'],
    spf: ['include:hotmail.com'],
  },
  turknet: {
    mx: ['mail.turk.net','mx1.turk.net', 'mx2.turk.net'],
    spf: ['include:turk.net'],
  },
  kocnet: {
    mx: ['mail.koc.net','mx1.koc.net', 'mx2.koc.net'],
    spf: ['include:koc.net'],
  },
  markum: {
    mx: ['mail.markum.net','mx1.markum.net', 'mx2.markum.net'],
    spf: ['include:markum.net'],
  },
  namecheap: {
    mx: ['mx1.registrar-servers.com', 'mx2.registrar-servers.com','mail.registrar-servers.com'],
    spf: ['include:spf.registrar-servers.com'],
  },
  bluehost: {
    mx: ['mx1.bluehost.com', 'mx2.bluehost.com','mail.bluehost.com'],
    spf: ['include:bluehost.com'],
  },
  dreamhost: {
    mx: ['mx1.dreamhost.com', 'mx2.dreamhost.com'],
    spf: ['include:dreamhost.com'],
  },
  siteground: {
    mx: ['mx1.siteground.net', 'mx2.siteground.net','mail.siteground.net'],
    spf: ['include:siteground.com'],
  },
  a2hosting: {
    mx: ['mx1.a2hosting.com', 'mx2.a2hosting.com','mail.a2hosting.com'],
    spf: ['include:a2hosting.com'],
  },
  inmotion: {
    mx: ['mx1.inmotionhosting.com', 'mx2.inmotionhosting.com','mail.inmotionhosting.com'],
    spf: ['include:inmotionhosting.com'],
  },
  hostpapa: {
    mx: ['mx1.hostpapa.com', 'mx2.hostpapa.com','mail.hostpapa.com'],
    spf: ['include:hostpapa.com'],
  },
  greengeeks: {
    mx: ['mx1.greengeeks.com', 'mx2.greengeeks.com','mail.greengeeks.com'],
    spf: ['include:greengeeks.com'],
  },
  namecom: {
    mx: ['mx1.name.com', 'mx2.name.com','mail.name.com'],
    spf: ['include:name.com'],
  },
  cloudflare: {
    mx: ['mx.cloudflare.com','mail.cloudflare.com', 'mx2.cloudflare.com'],
    spf: ['include:_spf.cloudflare.com'],
  },
  alastyr: {
    mx: ['mail.alastyr.com','mx1.alastyrhosting.com', 'mx2.alastyrhosting.com'],
    spf: ['include:alastyr.com'],
  },
  kurumsaleposta: {
    mx: ['mail.kurumsaleposta.com','mx1.kurumsaleposta.com', 'mx2.kurumsaleposta.com'],
    spf: ['include:kurumsaleposta.com'],
  },
  mailim: {
    mx: ['cmx.yaanimail.com','mx1.yaanimail.com', 'mx2.yaanimail.com','mail.yaanimail.com', "mail.mailim.com"],
    spf: ['include:yaanimail.com'],
  },
  ihs: {
    mx: ['mail.ihs.com.tr','mx1.ihs.com.tr', 'mx2.ihs.com.tr'],
    spf: ['include:ihs.com.tr'],
  },
  natro: {
    mx: ['mail.natro.com','mx1.natro.com', 'mx2.natro.com'],
    spf: ['include:natro.com'],
  },
  guzelhosting: {
    mx: ['mx1.guzelhosting.com', 'mx2.guzelhosting.com','mail.guzelhosting.com'],
    spf: ['include:guzelhosting.com'],
  },
  netdirekt: {
    mx: ['mail.netdirekt.com.tr','mx1.netdirekt.com.tr', 'mx2.netdirekt.com.tr'],
    spf: ['include:netdirekt.com.tr'],
  },
  vargonen: {
    mx: ['mx1.vargonen.net', 'mx2.vargonen.net','mail.vargonen.net'],
    spf: ['include:vargonen.net'],
  },
  idealhosting: {
    mx: ['mx1.idealhosting.net', 'mx2.idealhosting.net','mail.idealhosting.net'],
    spf: ['include:idealhosting.net'],
  },
  cenuta: {
    mx: ['mx1.cenuta.com', 'mx2.cenuta.com','mail.cenuta.com'],
    spf: ['include:cenuta.com'],
  },
  hostixo: {
    mx: ['mx1.hostixo.com', 'mx2.hostixo.com','mail.hostixo.com'],
    spf: ['include:hostixo.com'],
  },
  aerotek: {
    mx: ['mail.aerotek.com.tr'],
    spf: ['include:aerotek.com.tr'],
  },
}; 