import {DrupalAddressFieldType} from "@lib/types";

type Props = DrupalAddressFieldType & {
  singleLine?: boolean
}

const Address = ({address_line1, address_line2, administrative_area, country_code, locality, organization, postal_code, singleLine = false}: Props) => {


  if (singleLine) {
    const parts = [
      organization,
      address_line1,
      address_line2,
      locality,
      `${administrative_area} ${postal_code}`,
      `${country_code}`
    ];
    return (
      <address>{parts.filter(part => !!part).join(', ')}</address>
    )
  }

  return (
    <address>
      {organization && <div className="font-semibold">{organization}</div>}
      {address_line1 && <div>{address_line1}</div>}
      {address_line2 && <div>{address_line2}</div>}
      {locality && administrative_area && postal_code && <div>{locality}, {administrative_area} {postal_code}</div>}
      {country_code && <div>{country_code}</div>}
    </address>
  )
}
export default Address;