interface Point {
  readonly x: number;
  readonly y: number;
  readonly t?: number;
}

export default class Photon {
  public static horizontal(): Photon {
    return new Photon(1, 0, 0, 0);
  }
  public static vertical(): Photon {
    return new Photon(0, 0, 1, 0);
  }
  public static diagonal(): Photon {
    return new Photon(1 / Math.sqrt(2), 0, 1 / Math.sqrt(2), 0);
  }
  public static antidiagonal(): Photon {
    return new Photon(1 / Math.sqrt(2), 0, -1 / Math.sqrt(2), 0);
  }
  public static circularCW(): Photon {
    return new Photon(1 / Math.sqrt(2), 0, 0, 1 / Math.sqrt(2));
  }
  public static circularCCW(): Photon {
    return new Photon(1 / Math.sqrt(2), 0, 0, -1 / Math.sqrt(2));
  }

  // Gaussian scaling
  public static gaussian(z: number, sigma = 0.3): number {
    return Math.exp((-z * z) / (2 * sigma * sigma));
  }

  public readonly are: number;
  public readonly aim: number;
  public readonly bre: number;
  public readonly bim: number;

  constructor(are: number, aim: number, bre: number, bim: number) {
    this.are = are;
    this.aim = aim;
    this.bre = bre;
    this.bim = bim;
  }

  // Compute points of the electric field from its complex numbers
  public electric(z = 1, k = 1): Point {
    const Ex: number = this.are * Math.cos(k * z) + this.aim * Math.sin(k * z);
    const Ey: number = this.bre * Math.cos(k * z) + this.bim * Math.sin(k * z);
    return { x: Ex, y: Ey, t: z };
  }

  // Electric field in the X field
  public Ex(z: number, k = 20): number {
    return this.are * Math.cos(k * z) + this.aim * Math.sin(k * z);
  }
  // Electric field in the Y field
  public Ey(z: number, k = 20): number {
    return this.bre * Math.cos(k * z) + this.bim * Math.sin(k * z);
  }

  // Gaussian scaling
  public gaussianEx(z: number, sigma = 0.3): number {
    return this.Ex(z) * Math.exp((-z * z) / (2 * sigma * sigma));
  }
  public gaussianEy(z: number, sigma = 0.3): number {
    return this.Ey(z) * Math.exp((-z * z) / (2 * sigma * sigma));
  }
}
