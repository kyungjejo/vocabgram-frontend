import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledReactPlayer = styled(ReactPlayer)`
    min-width: 60%;
    max-width: 860px;
    margin: 8px auto;
`

const SmallReactPlayer = styled(ReactPlayer)`
    min-width: 30%;
    max-width: 420px;
    margin: 8px auto;
    padding: 4px;
`

const mapStateToProps = state => ({
    ...state
})

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setReady: false,
            offsetTime: 5,
            divActive: false,
            currentTime: 0,
        };
        this.onProgressHandler = this.onProgressHandler.bind(this);
        this.onReadyHandler = this.onReadyHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { offsetTime } = nextProps;
        if ( offsetTime)
        this.setState({
            offsetTime: offsetTime
        })
    }

    onProgressHandler(info) {
        const { offsetTime, targetTime, type } = this.props;
        const { playedSeconds } = info;
        if (this.player && playedSeconds>targetTime + offsetTime) {
            this.player.pause();
            this.player.seekTo(targetTime - offsetTime,"seconds");
        }
        if (this.player && playedSeconds<targetTime - offsetTime) {
            this.player.pause();
            this.player.seekTo(targetTime - offsetTime,"seconds");
        }
        if (this.player && type === 'practice') {
            if (playedSeconds>targetTime - 1 && playedSeconds<targetTime + 1)
                this.player.mute();
            else
                this.player.unmute();
        }
        if (playedSeconds>targetTime - 2 && playedSeconds<targetTime + 2) this.setState({divActive: true})
        else this.setState({divActive: false})
    }

    onReadyHandler() {
        const { targetTime } = this.props;
        const { setReady, offsetTime } = this.state;
        if (!setReady) {
            this.setState({setReady: !setReady})
            this.player.seekTo(targetTime - offsetTime,"seconds");
        }
    }

    render() {
        const { youtubeId, type } = this.props;
        const { divActive } = this.state;
        return (
            type === 'practice' ?
                <SmallReactPlayer ref={player => { this.player = player; }}
                    url={[`https://s3.ap-northeast-2.amazonaws.com/exprgram.kyungjejo.com/video/${youtubeId}.mp4`]}
                    type='video/mp4'
                    controls
                    autoplay={false}
                    progressInterval={500}
                    onProgress={this.onProgressHandler}
                    onReady={this.onReadyHandler}
                    config={{ file: {
                        attributes: {
                            crossOrigin: 'true'
                        },
                        tracks: [{
                            src:`https://s3.ap-northeast-2.amazonaws.com/exprgram.kyungjejo.com/subtitle/${youtubeId}.en.vtt`,
                            label:'English',
                            kind:'captions',
                            srcLang:'en',
                            default:true,
                        }]
                    }}}
                />
                :
            <div>
                <StyledReactPlayer ref={player => { this.player = player; }}
                    style={{ padding: '6px', background: divActive ? 'red' : 'unset' }}
                    url={[`https://s3.ap-northeast-2.amazonaws.com/exprgram.kyungjejo.com/video/${youtubeId}.mp4`]}
                    type='video/mp4'
                    controls
                    autoPlay={false}
                    progressInterval={500}
                    onProgress={this.onProgressHandler}
                    onReady={this.onReadyHandler}
                    config={{ file: {
                        attributes: {
                            crossOrigin: 'true'
                        },
                        tracks: [{
                            src:`https://s3.ap-northeast-2.amazonaws.com/exprgram.kyungjejo.com/subtitle/${youtubeId}.en.vtt`,
                            label:'English',
                            kind:'captions',
                            srcLang:'en',
                            default:true,
                        }]
                    }}}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Video)