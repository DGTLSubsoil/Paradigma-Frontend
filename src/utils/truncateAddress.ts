interface TruncateAddressProps {
  address?: `0x${string}`;
  startingWidth?: number;
  minimumCharacters?: number;
  width?: number;
  power?: number;
}

export function truncateAddress({
  address,
  width,
  startingWidth,
  minimumCharacters,
  power,
}: TruncateAddressProps) {
  const maxWidth = startingWidth || 1050;
  const minCharacters = minimumCharacters || 4;
  const powerOf = power || 2.6;

  if (address && width && width <= maxWidth) {
    const addressLength = address.length;

    const normalizedSlice = Math.max(
      minCharacters,
      Math.floor(
        addressLength *
          ((width - minCharacters) / ((maxWidth - minCharacters) * powerOf))
      )
    );

    const truncated =
      address.slice(0, normalizedSlice) +
      "..." +
      address.slice(-normalizedSlice);
    return truncated;
  } else {
    return address || undefined;
  }
}
