import { SpringConfig, useSpring } from "@react-spring/web";

export default function (config) {
  const [, api] = useSpring(() => ({ x: 0, y: 0 }));

  const scrollTo = ({ from, to, element }) => {
    api.start({
      reset: true,
      from: { x: from.x, y: from.y },
      to: { x: to.x, y: to.y },
      config,
      onRest: () => {},
      onChange: (_, ctrl) => {
        const { x, y } = ctrl.get();
        element.scrollTo(x, y);
      },
    });
  };

  return { scrollTo };
}
