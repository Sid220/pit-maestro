export enum CheckTypes {
    HEADER_1 = "header1",
    HEADER_2 = "header2",
    BOOL = "bool",
    STRING = "string"
}

export class Check {
    mode: CheckTypes;
    value: string;
    state: string | boolean;

    constructor(mode: CheckTypes, value: string, state?: boolean | string) {
        this.mode = mode;
        this.value = value;
        if (typeof state !== "undefined") {
            this.state = state;
        }
        else {
            this.state = mode == CheckTypes.BOOL ? false : "";
        }
    }

    toJSON() {
        return {
            type: this.mode.toString(),
            value: this.value,
            state: this.state
        }
    }
}

export const checklist = [
    new Check(CheckTypes.HEADER_1, 'Kinetic Tests'),

    new Check(CheckTypes.BOOL, 'Driving'),
    new Check(CheckTypes.BOOL, 'Intake Note'),
    new Check(CheckTypes.BOOL, 'Amp shot'),
    new Check(CheckTypes.BOOL, 'Outtake note from Shield position'),
    new Check(CheckTypes.BOOL, 'Climb'),
    new Check(CheckTypes.BOOL, 'Fender shot'),
    new Check(CheckTypes.BOOL, 'Elevator shot'),
    new Check(CheckTypes.BOOL, 'Smart Intake'),


    new Check(CheckTypes.HEADER_1, 'Static Tests'),


    new Check(CheckTypes.HEADER_2, 'Chassis'),

    new Check(CheckTypes.BOOL, 'Bumpers set to correct colour'),
    new Check(CheckTypes.BOOL, 'Bumpers tightly secure'),
    new Check(CheckTypes.BOOL, 'Swerve motors secure'),
    new Check(CheckTypes.BOOL, 'Swerve mounting bolts secure'),
    new Check(CheckTypes.BOOL, 'Check tread wear'),
    new Check(CheckTypes.BOOL, 'Check wheel wobble'),
    new Check(CheckTypes.BOOL, 'Check wheel fenders'),

    new Check(CheckTypes.HEADER_2, 'Intake'),

    new Check(CheckTypes.BOOL, 'Check bolts'),
    new Check(CheckTypes.BOOL, 'Make sure belts are not stripped'),
    new Check(CheckTypes.BOOL, 'Make sure pulleys are not stripped'),
    new Check(CheckTypes.BOOL, 'Motors properly secured'),
    new Check(CheckTypes.BOOL, 'Rivets not sheared'),
    new Check(CheckTypes.BOOL, 'Wipe rollers with IPA'),

    new Check(CheckTypes.HEADER_2, 'Elevator'),

    new Check(CheckTypes.BOOL, 'Check Bolts'),
    new Check(CheckTypes.BOOL, 'Bearing blocks secure'),
    new Check(CheckTypes.BOOL, 'Chain Secure'),
    new Check(CheckTypes.BOOL, 'Rivets not sheared'),
    new Check(CheckTypes.BOOL, 'Hard stops intact'),
    new Check(CheckTypes.BOOL, 'Climbing hooks intact'),
    new Check(CheckTypes.BOOL, 'Bolt in 2x1 isn\'t loose'),
    new Check(CheckTypes.BOOL, 'Elevator motor gearbox good'),
    new Check(CheckTypes.BOOL, 'Elevator motor brackets good'),

    new Check(CheckTypes.HEADER_2, 'Shooter'),

    new Check(CheckTypes.BOOL, 'Motors secure'),
    new Check(CheckTypes.BOOL, 'All bolts fastened'),
    new Check(CheckTypes.BOOL, 'Belt tension correct, not stripped'),
    new Check(CheckTypes.BOOL, 'Flywheel assembly moves freely'),
    new Check(CheckTypes.BOOL, '3DP and polycarb not damaged'),
    new Check(CheckTypes.BOOL, 'Fastened to pivot'),
    new Check(CheckTypes.BOOL, 'Pivot chain secured'),
    new Check(CheckTypes.BOOL, 'Wipe down rollers with IPA'),
    new Check(CheckTypes.BOOL, 'Check ceramic coating'),

    new Check(CheckTypes.HEADER_2, 'Electrical'),

    new Check(CheckTypes.BOOL, 'Radio bolts secured'),
    new Check(CheckTypes.BOOL, 'Wires clear of swerve modules, elevator, shooter, and intake'),
    new Check(CheckTypes.BOOL, 'Radio ethernet secure'),
    new Check(CheckTypes.BOOL, 'Main Breaker secure'),
    new Check(CheckTypes.BOOL, 'New battery above 115% charge'),
    new Check(CheckTypes.BOOL, 'New battery placed into robot'),
    new Check(CheckTypes.BOOL, 'Battery secure and zip-tied'),
    new Check(CheckTypes.BOOL, 'Kraken LEDs on (orange)'),
    new Check(CheckTypes.BOOL, 'Spark LEDs on (cyan or magenta)'),
    new Check(CheckTypes.BOOL, 'Spark Max screws tight'),
    new Check(CheckTypes.BOOL, 'Sensor screws tight'),
    new Check(CheckTypes.BOOL, 'Limelight bolts secure'),
    new Check(CheckTypes.BOOL, 'Limelight on'),
    new Check(CheckTypes.BOOL, 'Check wago connections'),
    new Check(CheckTypes.BOOL, "Limelight hot glue in tact"),

    new Check(CheckTypes.STRING, "Battery Number"),
    new Check(CheckTypes.STRING, "Battery Charge (%)"),
    new Check(CheckTypes.STRING, "Battery Resistance"),
    new Check(CheckTypes.STRING, 'Notes')
]

export function toJSONString(checks: Check[]) {
    let JSONstring: {
        type: string,
        value: string,
        state: string | boolean

    }[] = []
    checks.forEach((check) => {
        JSONstring.push(check.toJSON())
    })
    return JSON.stringify(JSONstring);
}

export function fromJSONString(checks: string) {
    let data = (JSON.parse(checks) as {
        type: string,
        value: string,
        state: string | boolean
    }[]);

    let parsedChecks: Check[] = [];
    data.forEach(((c) => {
        let checkType = CheckTypes.HEADER_1
        switch (c.type) {
            case "bool":
                checkType = CheckTypes.BOOL
                break;
            case "header1":
                checkType = CheckTypes.HEADER_1
                break;
            case "header2":
                checkType = CheckTypes.HEADER_2
                break;
            case "string":
                checkType = CheckTypes.STRING
                break;
        }
        parsedChecks.push(new Check(checkType, c.value, c.state));
    }));

    return parsedChecks;
}