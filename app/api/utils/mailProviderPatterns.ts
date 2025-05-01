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
    mx: ['mx.yandex.net'],
    spf: ['include:_spf.yandex.net'],
  },
  zoho: {
    mx: ['mx.zoho.com', 'mx2.zoho.com', 'mx3.zoho.com'],
    spf: ['include:zoho.com', 'include:_spf.zoho.com'],
  },
  protonmail: {
    mx: ['mail.protonmail.ch'],
    spf: ['include:_spf.protonmail.ch'],
  },
  amazon: {
    mx: ['inbound-smtp.us-east-1.amazonaws.com'],
    spf: ['include:amazonses.com'],
  },
  mailgun: {
    mx: ['mxa.mailgun.org', 'mxb.mailgun.org'],
    spf: ['include:mailgun.org'],
  },
  sendgrid: {
    mx: ['mx.sendgrid.net'],
    spf: ['include:sendgrid.net'],
  },
  godaddy: {
    mx: ['smtp.secureserver.net'],
    spf: ['include:secureserver.net'],
  },
  yahoo: {
    mx: ['mta5.am0.yahoodns.net', 'mta6.am0.yahoodns.net'],
    spf: ['include:_spf.yahoo.com'],
  },
  promail: {
    mx: ['mx.promail.com.tr'],
    spf: ['include:promail.com.tr'],
  },
  mailbox: {
    mx: ['mx.mailbox.com.tr'],
    spf: ['include:mailbox.com.tr'],
  },
  uzmanposta: {
    mx: ['mx.uzmanposta.com'],
    spf: ['include:uzmanposta.com'],
  },
  fastmail: {
    mx: ['in1-smtp.messagingengine.com', 'in2-smtp.messagingengine.com'],
    spf: ['include:spf.messagingengine.com'],
  },
  icloud: {
    mx: ['mx1.mail.icloud.com', 'mx2.mail.icloud.com'],
    spf: ['include:icloud.com'],
  },
  rackspace: {
    mx: ['mx1.emailsrvr.com', 'mx2.emailsrvr.com'],
    spf: ['include:emailsrvr.com'],
  },
  ovh: {
    mx: ['mx0.ovh.net', 'mx1.ovh.net'],
    spf: ['include:mx.ovh.com'],
  },
  hetzner: {
    mx: ['mail.your-server.de'],
    spf: ['include:spf.your-server.de'],
  },
  hostinger: {
    mx: ['mx1.hostinger.com', 'mx2.hostinger.com'],
    spf: ['include:spf.hostinger.com'],
  },
  hostgator: {
    mx: ['mx1.hostgator.com', 'mx2.hostgator.com'],
    spf: ['include:hostgator.com'],
  },
  netinternet: {
    mx: ['mail.netinternet.com.tr'],
    spf: ['include:netinternet.com.tr'],
  },
  veridyen: {
    mx: ['mail.veridyen.com'],
    spf: ['include:veridyen.com'],
  },
  isimtescil: {
    mx: ['mail.isimtescil.net'],
    spf: ['include:isimtescil.net'],
  },
  superonline: {
    mx: ['mail.superonline.com'],
    spf: ['include:superonline.com'],
  },
  vodafone: {
    mx: ['mail.vodafone.com.tr'],
    spf: ['include:vodafone.com.tr'],
  },
  turkcell: {
    mx: ['mail.turkcell.com.tr'],
    spf: ['include:turkcell.com.tr'],
  },
  ttnet: {
    mx: ['mail.ttnet.com.tr'],
    spf: ['include:ttnet.com.tr'],
  },
  aruba: {
    mx: ['mx1.aruba.it', 'mx2.aruba.it'],
    spf: ['include:aruba.it'],
  },
  turkticaret: {
    mx: ['mail.turkticaret.net'],
    spf: ['include:turkticaret.net'],
  },
  turhost: {
    mx: ['mail.turhost.com', 'mx1.turhost.com', 'mx2.turhost.com'],
    spf: ['include:turhost.com'],
  },
  nic: {
    mx: ['mail.nic.tr'],
    spf: ['include:nic.tr'],
  },
  gmail: {
    mx: ['gmail-smtp-in.l.google.com'],
    spf: ['include:_spf.google.com'],
  },
  hotmail: {
    mx: ['mx1.hotmail.com', 'mx2.hotmail.com'],
    spf: ['include:hotmail.com'],
  },
  turknet: {
    mx: ['mail.turk.net'],
    spf: ['include:turk.net'],
  },
  kocnet: {
    mx: ['mail.koc.net'],
    spf: ['include:koc.net'],
  },
  markum: {
    mx: ['mail.markum.net'],
    spf: ['include:markum.net'],
  },
  namecheap: {
    mx: ['mx1.registrar-servers.com', 'mx2.registrar-servers.com'],
    spf: ['include:spf.registrar-servers.com'],
  },
  bluehost: {
    mx: ['mx1.bluehost.com', 'mx2.bluehost.com'],
    spf: ['include:bluehost.com'],
  },
  dreamhost: {
    mx: ['mx1.dreamhost.com', 'mx2.dreamhost.com'],
    spf: ['include:dreamhost.com'],
  },
  siteground: {
    mx: ['mx1.siteground.net', 'mx2.siteground.net'],
    spf: ['include:siteground.com'],
  },
  a2hosting: {
    mx: ['mx1.a2hosting.com', 'mx2.a2hosting.com'],
    spf: ['include:a2hosting.com'],
  },
  inmotion: {
    mx: ['mx1.inmotionhosting.com', 'mx2.inmotionhosting.com'],
    spf: ['include:inmotionhosting.com'],
  },
  hostpapa: {
    mx: ['mx1.hostpapa.com', 'mx2.hostpapa.com'],
    spf: ['include:hostpapa.com'],
  },
  greengeeks: {
    mx: ['mx1.greengeeks.com', 'mx2.greengeeks.com'],
    spf: ['include:greengeeks.com'],
  },
  namecom: {
    mx: ['mx1.name.com', 'mx2.name.com'],
    spf: ['include:name.com'],
  },
  cloudflare: {
    mx: ['mx.cloudflare.net'],
    spf: ['include:_spf.cloudflare.com'],
  },
  alastyr: {
    mx: ['mail.alastyr.com'],
    spf: ['include:alastyr.com'],
  },
  kurumsaleposta: {
    mx: ['mail.kurumsaleposta.com'],
    spf: ['include:kurumsaleposta.com'],
  },
}; 