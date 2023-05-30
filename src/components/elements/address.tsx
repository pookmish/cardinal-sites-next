interface Props {
  address_line1?: string
  address_line2?: string
  administrative_area?: string
  country_code?: string
  locality?: string
  organization?: string
  postal_code?: string
  singleLine?: boolean
}

const Address = ({address_line1, address_line2, administrative_area, country_code, locality, organization, postal_code, singleLine = false}: Props) => {

  if (singleLine) {
    const string = `${organization}, ${address_line1}, ${locality}, ${administrative_area} ${postal_code}, ${country_code}`
    return (
      <address>{string}</address>
    )
  }

  return (
    <div>
      <address className="font-semibold">{organization}</address>
      <div>{address_line1}</div>
      <div>{address_line2}</div>
      <div>{locality}, {administrative_area} {postal_code}</div>
      <div>{country_code}</div>
    </div>
  )
}
export default Address;