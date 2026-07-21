import XsmithsAccent from "@/components/xsmiths/XsmithsAccent"

type XsmithsBeliefLineProps = {
  line: string
  emphasis: string
}

/** Renders a philosophy line with the emphasized word in Instrument Serif accent. */
export default function XsmithsBeliefLine({
  line,
  emphasis,
}: XsmithsBeliefLineProps) {
  const [before = "", after = ""] = line.split(emphasis)

  return (
    <>
      {before}
      <XsmithsAccent>{emphasis}</XsmithsAccent>
      {after}
    </>
  )
}
