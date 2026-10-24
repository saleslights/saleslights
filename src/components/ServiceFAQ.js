import '../app/services.css';

export default function ServiceFAQ({ items = [] }) {
  return (
    <div className="service-faq">
      {items.map(({ question, answer }) => (
        <details className="service-faq-item" key={question}>
          <summary><span>{question}</span><span className="service-disclosure" aria-hidden="true" /></summary>
          <div className="service-faq-answer"><p>{answer}</p></div>
        </details>
      ))}
    </div>
  );
}
