import {Address as AddressType} from "@lib/gql/__generated__/drupal";
import {DrupalAddressFieldType} from "@lib/drupal/drupal-jsonapi.types";

type Props = AddressType & DrupalAddressFieldType & {
  singleLine?: boolean
}

const Address = ({
  addressLine1,
  address_line1,
  addressLine2,
  address_line2,
  administrativeArea,
  administrative_area,
  country,
  country_code,
  locality,
  organization,
  postalCode,
  postal_code,
  singleLine = false
}: Props) => {


  if (singleLine) {
    const parts = [
      organization,
      addressLine1 || address_line1,
      addressLine2 || address_line2,
      locality,
      `${administrativeArea || administrative_area} ${postalCode || postal_code}`,
      `${country?.code || country_code}`
    ];
    return (
      <address>{parts.filter(part => !!part).join(', ')}</address>
    )
  }

  return (
    <address>
      {organization && <div className="font-semibold">{organization}</div>}
      {(addressLine1 || address_line1) && <div>{addressLine1 || address_line1}</div>}
      {(addressLine2 || address_line2) && <div>{addressLine2 || address_line2}</div>}
      {(locality && (administrativeArea || administrative_area) && (postalCode || postal_code)) &&
        <div>{locality}, {administrativeArea || administrative_area} {postalCode || postal_code}</div>}
      {(country?.code || country_code) && <div>{country?.code || country_code}</div>}
    </address>
  )
}
export default Address;