import Closing from '../../components/Closing';
import JsonLd, { ORG_ID, PERSON_ID } from '../../components/JsonLd';
import BookInvoiceForm from '../../components/BookInvoiceForm';
import { BOOK } from '../../content/site';
import { pageMeta } from '../../content/seo';
import { absolute } from '../../lib/env';

export const metadata = pageMeta('/book/');

export default function Book() {
  return (
    <>
      <section className="page-head">
        <div className="wrap split top">
          <div className="copy">
            <p className="eyebrow">One hour · Video call</p>
            <h1>Book time with Nick</h1>
            <p className="lede">{BOOK.summary}</p>
          </div>
          <div className="book-card">
            <p className="price">{BOOK.price}<small>/ {BOOK.duration}</small></p>
            <ol className="steps">{BOOK.steps.map((s) => <li key={s}><span>{s}</span></li>)}</ol>
            <BookInvoiceForm />
            <p className="muted small">Saleslights Inc. sends the invoice through Mercury. Pay by ACH debit or bank transfer, then you get Nick’s calendar link.</p>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap split top">
          <div className="copy"><p className="eyebrow">Good for</p><h2>Bring one hard problem.</h2></div>
          <ul className="checks">{BOOK.goodFor.map((g) => <li key={g}>{g}</li>)}</ul>
        </div>
      </section>

      <Closing title="Need more than an hour?" text="Programs, builds and training are scoped separately. Tell us what you are working on." contactFirst />
      <JsonLd data={{
        '@type': 'Product', name: `${BOOK.name} (1-Hr)`, description: BOOK.summary, brand: { '@id': ORG_ID }, url: absolute('/book/'),
        offers: { '@type': 'Offer', price: '500.00', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: absolute('/book/'), seller: { '@id': ORG_ID } },
        isRelatedTo: { '@id': PERSON_ID },
      }} />
    </>
  );
}
