import PurpleButton from "@/components/buttons/Purple";
import GreyButton from "@/components/buttons/Grey";

export default function BuyParadTokensButtons(props: {
    variant: 'purple' | 'gray';
}) {
    const { variant } = props;
    return (
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '20px'}}>
            <a
                style={{height: 75, width: "100%"}}
                target="_blank"
                href={process.env.NEXT_PUBLIC_BUY_PARAD_PANCAKESWAP as string}
            >
                {
                    variant === "purple"
                    ?
                    <PurpleButton
                        style={{width: "100%", height: "100%", fontSize: 18}}
                        title="Buy Parad on Pancakeswap"
                    />
                    :
                    <GreyButton title={"Buy Parad on Pancakeswap"} style={{width: "100%", height: "100%", fontSize: 18}}/>
                }

            </a>
            <a
                style={{height: 75, width: "100%"}}
                target="_blank"
                href={process.env.NEXT_PUBLIC_BUY_PARAD_UNISWAP as string}
            >
                {
                    variant === "purple"
                    ?
                    <PurpleButton
                        style={{width: "100%", height: "100%", fontSize: 18}}
                        title="Buy Parad on Uniswap"
                    />
                    :
                    <GreyButton title={"Buy Parad on Uniswap"} style={{width: "100%", height: "100%", fontSize: 18}}/>
                }
            </a>
        </div>
    );
}