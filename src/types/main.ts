export interface UOrganization {
  url: string;
  name: string;
  codeName: string;
}

export interface UCategory {
  name: string;
  codeName: string;
}

export interface USource {
  url: string;
  category: string;
  organization: string;
}

export interface UJournal {
  rss: {
    url: string;
    title: string;
    content: string;
    pubDate: string;
  };
  result: {
    title: string;
    summary: string;
    ptimestamp: number;
  };
  source: string;
  category: string;
  organization: string;
}
