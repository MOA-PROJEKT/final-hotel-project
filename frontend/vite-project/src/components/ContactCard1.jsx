export default function ContactCard({ title, address, phone, email }) {
  return (
    <div className="bg-white rounded-xl shadow-sm px-10 py-12 text-center min-h-[260px] flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-medium mb-4">{title}</h3>
        <p className="text-slate-600">{address}</p>
        <p className="text-slate-600">{phone}</p>
      </div>

      <a
        href={`mailto:${email}`}
        className="mt-6 text-[#b30042] font-medium hover:underline"
      >
        {email}
      </a>
    </div>
  )
}
